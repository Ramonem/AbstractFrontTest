import React from 'react'
import { Input } from 'antd'
import Container from './Container'
import Text from './Text'

export default function InputContainer({ label, name, onChange }) {
    return (
        <Container width='100%' flexDirection='row' alignItems='center' m={'5px 0'}>
            <Text width='25%' >
                {label}
            </Text>
            <Input style={{ width: '75%' }} name={name} onChange={({ target: { value } }) => onChange({ name, value })} />
        </Container>
    )
}