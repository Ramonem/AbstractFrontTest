import React, { useEffect, useState } from 'react'
import Container from './Container'
import { Modal, Divider, message } from 'antd'
import Text from './Text'
import { API } from '../config/api'
import SelectContainer from './SelectContainer'
import InputContainer from './InputContainer'
import DateContainer from './DateContainer'

export default function ModalContainer({ visible, setModal }) {
    const [gameTypes, setGameTypes] = useState({ loading: true, data: [] })
    const [sportsVenues, setSportsVenues] = useState({ loading: true, data: [] })
    const [form, setForm] = useState({})
    const handleOnChange = ({ name, value }) => {
        setForm({ ...form, [name]: value })
    }
    const createEvent = async () => {
        if (form.name && form.gameTypeId && form.sportsVenueId && form.date) {
            await API.createEvent(form)
            setForm({})
            setModal(false)
        } else {
            message.error('Rellena todos los datos')
        }
    }
    useEffect(() => {
        const getGameTypes = async () => {
            const data = await API.getGameTypes()
            setGameTypes({ loading: false, data })
        }
        const getSportsVenues = async () => {
            const data = await API.getSportsVenues()
            setSportsVenues({ loading: false, data })
        }
        getGameTypes()
        getSportsVenues()
    }, [])
    return (
        <Modal visible={visible} onCancel={() => setModal(false)} cancelText='Cancelar' okText='Crear' onOk={() => createEvent()}>
            <Container>
                <Divider>Crear un Evento</Divider>
                <InputContainer label={'Nombre del partido'} name={'name'} onChange={handleOnChange} />
                <SelectContainer label={'Tipo de partido'} options={gameTypes.data} name={'gameTypeId'} onChange={handleOnChange} loading={gameTypes.loading} />
                <SelectContainer label={'Recinto deportivo'} options={sportsVenues.data} name={'sportsVenueId'} onChange={handleOnChange} loading={gameTypes.loading} />
                <DateContainer label={'Fecha del evento'} name={'date'} onChange={handleOnChange} />
            </Container>
        </Modal>
    )
}