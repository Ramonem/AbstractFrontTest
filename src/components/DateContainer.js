import React from 'react'
import { DatePicker } from 'antd'
import locale from 'antd/es/date-picker/locale/es_ES'
import Container from './Container'
import Text from './Text'

export default function DateContainer({ label, name, onChange }) {
  return (
    <Container width="100%" flexDirection="row" alignItems="center" m={`5px 0`}>
      <Text width="25%">{label}</Text>
      <DatePicker
        showTime={{ format: `HH:mm` }}
        locale={locale}
        style={{ width: `75%` }}
        name={name}
        onChange={value => onChange({ name, value })}
      />
    </Container>
  )
}
