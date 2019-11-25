import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import moment from 'moment'
import Container from '../components/Container'
import Text from '../components/Text'
import { API } from '../config/api'
import 'moment/locale/es'
import ModalContainer from '../components/ModalContainer'
moment.locale(`es`)

export default function List({ history }) {
  const [events, setEvents] = useState([])
  const [modal, setModal] = useState(false)
  useEffect(() => {
    const getEvents = async () => {
      const data = await API.getEvents()
      setEvents(data)
    }
    getEvents()
  }, [modal])
  return (
    <Container backgroundColor="white" m={10} p={10}>
      <ModalContainer visible={modal} setModal={setModal} />
      <Container
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        p={10}
      >
        <Text fontWeight="bold" fontSize={24}>
          Lista de partidos
        </Text>
        <Button onClick={() => setModal(!modal)}>Crear partido</Button>
      </Container>
      <Table
        onRowClick={({ id }) => history.push(`/detail/${id}`)}
        rowKey="id"
        style={{ width: `100%` }}
        columns={[
          {
            title: `Fecha`,
            dataIndex: `date`,
            key: `date`,
            render: date => moment(date).format(`LLL`),
          },
          {
            title: `Nombre partido`,
            dataIndex: `name`,
            key: `name`,
          },
          {
            title: `Tipo partido`,
            dataIndex: `GameType.name`,
            key: `GameType.name`,
          },
        ]}
        dataSource={events}
      />
    </Container>
  )
}
