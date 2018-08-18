import styled from 'styled-components'

const FormRow = styled.div`
  display: block;
  margin: 0 0 1rem;
`

const Label = styled.label`
  display: block;
  margin: 0 0 .33rem;
`

const Input = styled.input`
  padding: .5rem;
  border-radius: 3px;
  font-size: 16px;
  outline: none;
  border: 1px solid #ddd;
  margin: 0 0 1rem;

  &:focus {
    box-shadow: 0 0 0 1px;
  }
`

export {
  FormRow,
  Label,
  Input,
}
