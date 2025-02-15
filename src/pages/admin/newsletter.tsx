import { useState, useEffect, SetStateAction } from 'react'
import Heading from '../../components/Heading'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios'
import { Table, TextInput } from 'flowbite-react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [loading, setLoading] = useState(false)
  const [Newsletter, setNewsletter] = useState<Array<any>>([])
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const newsletterHeader = ['Email', 'Full Name', 'Date Subscribed', 'Source', 'Status']

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/newsletter',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          const data = response.data.newsletter.members
          setNewsletter(data)
          setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchData()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = Newsletter.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  return (
    <AdminLayout>
      <div>
        <Heading size={3}>Newsletter</Heading>
        <p className="text-base">Lists of newsletter subscribers</p>
        <div className="my-10 text-center">
          <Title>Newsletter</Title>
          <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-6">
            <div className="mt-3 flex justify-between">
              <TextInput
                id="search"
                type="text"
                placeholder="Search"
                required={true}
                icon={MagnifyingGlassIcon}
              />
            </div>
            <div className="mt-8">
              <TableLayout
                header={newsletterHeader.map((title) => {
                  return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                })}
                body={currentPosts?.map(
                  ({ id, email_address, full_name, timestamp_opt, source, status }) => {
                    return (
                      <Table.Row className="bg-white" key={id}>
                        <Table.Cell>{email_address}</Table.Cell>
                        <Table.Cell>{full_name}</Table.Cell>
                        <Table.Cell>{new Date(timestamp_opt).toUTCString()}</Table.Cell>
                        <Table.Cell>{source}</Table.Cell>
                        <Table.Cell>
                          <span
                            className={`rounded-full px-4 py-2 font-semibold ${
                              status === 'subscribed'
                                ? 'bg-green-100 text-green-500'
                                : 'bg-gray-100 text-gray-500'
                            } capitalize`}
                          >
                            {status}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    )
                  }
                )}
                loader={loading}
              />

              <div className="mt-4 flex items-center justify-center text-center">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={Newsletter.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
