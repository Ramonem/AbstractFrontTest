import styled from 'styled-components'
import {
  space,
  border,
  color,
  layout,
  flexbox,
  position,
  shadow,
  compose,
} from 'styled-system'

const Container = styled.div`
  ${compose(space, border, color, layout, flexbox, position, shadow)}
`
Container.defaultProps = {
  display: `flex`,
  justifyContent: `flex-start`,
  justifyItems: `flex-start`,
  alignContent: `flex-start`,
  alignItems: `flex-start`,
  flexDirection: `column`,
}

export default Container
