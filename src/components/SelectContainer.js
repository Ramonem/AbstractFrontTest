import React from 'react'
import { Select } from 'antd'
import Container from './Container'
import Text from './Text'
const { Option } = Select

export default function SelectContainer({
  label,
  options,
  name,
  loading,
  onChange,
}) {
  return (
    <Container width="100%" flexDirection="row" alignItems="center" m={`5px 0`}>
      <Text width="25%">{label}</Text>
      <Select
        style={{ width: `75%` }}
        placeholder={label}
        onChange={value => onChange({ name, value })}
        name={name}
        loading={loading}
      >
        {options.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    </Container>
  )
}
