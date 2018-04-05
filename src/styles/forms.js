import styled from 'styled-components'

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

const ValidationError = styled.div`
  color: red;
  margin: -1rem 0 0;
`

const Button = styled.button`
  padding: .5rem;
  border-radius: 3px;
  font-size: 16px;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 1px;
  }
`

export {
  Label,
  Input,
  ValidationError,
  Button,
}
