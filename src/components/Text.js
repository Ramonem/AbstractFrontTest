import styled from 'styled-components'
import {
    typography,
    compose,
    color,
    layout,
    space,
    border,
    flexbox,
    position,
} from 'styled-system'

const Text = styled.span`
  ${compose(
    typography,
    color,
    layout,
    space,
    border,
    flexbox,
    position,
)}
`

Text.defaultProps = {
    color: 'black'
}

export default Text
