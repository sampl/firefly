import styled from 'styled-components'

const FormRow = styled.div`
  display: block;
  margin: 0 0 1rem;
`
const FormLabel = styled.label`
  display: block;
  margin: 0 0 .33rem;
`
const TextInput = styled.input`
  padding: .5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin: 0 0 1rem;
`
const TextArea = styled.textarea`
  padding: .5rem;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
  margin: 0 0 1rem;
`

export {
  FormRow,
  FormLabel,
  TextInput,
  TextArea,
}
