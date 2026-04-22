import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'
import { useSelector } from "react-redux"
import io from "socket.io-client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dateDifference from '../../utils/dateDifference'


const Order = () => {
  const { currentAccount } = useSelector((state) => {
    return state.accountList
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [data, setData] = useState("")
  const [newOrderUpdate, setNewOrderUpdate] = useState("")
 
  const fetchOrder = async () => {
    try {
      console.log(currentAccount[0].email)
      const response = await fetch(`http://localhost:4000/order-track/${currentAccount[0].email}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          console.log(result.data)
          setData(result.data)
          return
        }
        setError("Something went wrong")
        return
      }
      setError("Something went wrong")
    } catch (err) {
      console.log(err)
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [currentAccount[0]?.email, newOrderUpdate])

  useEffect(() => {
    const socket = io("http://localhost:4000/order:track");

    socket.on("connect", () => {
      alert("Connected:", socket.id)
      console.log("Connected:", socket.id);
      socket.emit("join", currentAccount[0]?.email)
    });

    socket.on("orderUpdated", (data)=>{
      setNewOrderUpdate(data)
    })

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box>
        {loading ? (
          <Box>
            <Typography variant="body1" color="initial">Loading...</Typography>
          </Box>
        ) : error ? (
          <Box>
            <Typography variant="body1" color="initial">{error}</Typography>
          </Box>
        ) : data.length <= 0 ? (
          <Box>
            <Typography variant="body1" color="initial">No orders</Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" color="initial">Orders</Typography>




            <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow
                          sx={{
                              height: "70px",
            
                              '& th': {
                                borderBottom: 2,
                                borderTop: 2,
                                borderColor: 'divider',
                              }
                            }}>
                            <TableCell>FullName</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Grand Price</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Payment Status</TableCell>
                          </TableRow>
                        </TableHead>
                        {
                          data.length ? (
                            <TableBody>
                          {data.map((row) => (
                            <TableRow
                              key={row.name}
                              hover
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  borderBottom: 'none',
                                },
                                '& td': {
                                  borderBottom: 2,
                                  borderColor: 'divider',
                                },
                                '& th': {
                                  borderBottom: 2,
                                  borderColor: 'divider',
                                }
                              }}
                            >
                              <TableCell component="td" scope="row"  sx={{textWrap: "nowrap"}}>
                                {row.shippingAddress.fullName}
                              </TableCell>
                              <TableCell component="td" scope="row">
                                {row.shippingAddress.email}
                              </TableCell>
                              <TableCell component="td" scope="row">
                                {row.shippingAddress.phone}
                              </TableCell>
                              <TableCell component="td" scope="row" sx={{textWrap: "nowrap"}}>
                                {dateDifference(row.createdAt)}
                              </TableCell>
                              <TableCell>{row.shippingAddress.state}/{row.shippingAddress.country}</TableCell>
                              <TableCell>{row.grandPrice}</TableCell>
                              <TableCell>{row.orderStatus}</TableCell>
                              <TableCell>{row.paymentInfo.status}</TableCell>
                             
                            </TableRow>
                          ))}
                        </TableBody>
                          ): ("")
                        }
                      </Table>
                      {
                        data?.length > 0? (""): (
                          <Typography sx={{textAlign: "center", my: 2, color: "primary.main"}} variant="body1">
                            No Order
                          </Typography>
                        )
                      }
                    </TableContainer>
          </Box>
        )}
      </Box>
    </Container>

  )
}

export default Order
