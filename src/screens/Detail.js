import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { Divider, Table, Input, Button, Modal } from 'antd'
import Text from '../components/Text'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { API } from '../config/api'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { confirm } = Modal

export default function Detail({ match: { params: { id } } }) {
    const [event, setEvent] = useState({})
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [playerMail, setPlayerMail] = useState('')
    const getEvent = async () => {
        const data = await API.getEvent(id)
        setEvent(data)
        setLoading(false)
    }
    const getEventInvitations = async () => {
        const data = await API.getEventInvitations(id)
        setPlayers(data)
    }
    const sendInvitation = async () => {
        await API.createEventInvitation({ playerMail, eventId: id })
        setPlayerMail('')
        getEventInvitations()
    }
    useEffect(() => {
        getEventInvitations()
        getEvent()
    }, [])
    return (
        <Container backgroundColor='white' p={10} m={10}>
            <Link to='/'>Volver</Link>
            {
                loading ?
                    <Text alignSelf='center' fontSize='2rem' fontWeight='bold'>Cargando..</Text> :
                    <>
                        <Text alignSelf='center' fontSize='4rem'>{event.name}</Text>
                        <Container flexDirection='row' width='100%'>
                            <Container flex={1}>
                                <Container width='100%' p={10}>
                                    <Divider orientation='left'>Informacion del partido</Divider>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Fecha y hora</Text>
                                        <Text fontSize={24} flex={2}>{moment(event.date).format('LLL')}</Text>
                                    </Container>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Tipo de partido</Text>
                                        <Text fontSize={24} flex={2}>{event.GameType.name}</Text>
                                    </Container>
                                </Container>
                                <Container width='100%' p={10}>
                                    <Divider orientation='left'>Informacion del Recinto deportivo</Divider>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Nombre del recinto</Text>
                                        <Text fontSize={24} flex={2}>{event.SportsVenue.name}</Text>
                                    </Container>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Télefono</Text>
                                        <Text fontSize={24} flex={2}>{event.SportsVenue.phone}</Text>
                                    </Container>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Calle</Text>
                                        <Text fontSize={24} flex={2}>{event.SportsVenue.street} {event.SportsVenue.number}</Text>
                                    </Container>
                                    <Container flexDirection='row' width='100%'>
                                        <Text fontSize={24} fontWeight='900' flex={1}>Comuna</Text>
                                        <Text fontSize={24} flex={2}>{event.SportsVenue.commune}</Text>
                                    </Container>
                                    <Container width='100%' border='1px solid'>
                                        <Map center={[event.SportsVenue.latitude, event.SportsVenue.longitude]} zoom={13}>
                                            <TileLayer
                                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[event.SportsVenue.latitude, event.SportsVenue.longitude]}>
                                                <Popup>
                                                    A pretty CSS3 popup. <br /> Easily customizable.
                                                </Popup>
                                            </Marker>
                                        </Map>
                                    </Container>
                                </Container>
                            </Container>
                            <Container flex={1} p={10}>
                                <Divider orientation='left'>Jugadores</Divider>
                                <Text fontWeight='bold' fontSize='2rem'>Faltan {event.GameType.name === 'Fútbol' ? 22 - players.length : event.GameType.name === 'Futbolito' ? 14 - players.length : 10 - players.length} Jugadores</Text>
                                <Container flexDirection='row' width='100%' m='10px 0'>
                                    <Input placeholder='Email' value={playerMail} onChange={({ target: { value } }) => setPlayerMail(value)} />
                                    <Button disabled={!playerMail} onClick={() => sendInvitation()}>Invitar</Button>
                                </Container>
                                <Table
                                    rowKey='id'
                                    style={{ width: '100%' }}
                                    columns={[
                                        {
                                            title: 'Email',
                                            dataIndex: 'playerMail',
                                            key: 'playerMail',
                                        },
                                        {
                                            title: 'Estado',
                                            dataIndex: 'status',
                                            key: 'status',
                                        },
                                    ]}
                                    dataSource={players}
                                    onRowClick={({ playerMail }) => confirm({
                                        title: '¿Aceptar invitación al partido?',
                                        okText: 'Aceptar',
                                        cancelText: 'Rechazar',
                                        onOk: async () => {
                                            await API.updateEventInvitation(id, { playerMail, status: 'Aceptado' })
                                            return getEventInvitations()
                                        },
                                        onCancel: async () => {
                                            await API.updateEventInvitation(id, { playerMail, status: 'Rechazado' })
                                            return getEventInvitations()
                                        }
                                    })}
                                />
                            </Container>
                        </Container>
                    </>
            }
        </Container>
    )
}