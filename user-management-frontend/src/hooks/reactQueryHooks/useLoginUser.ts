import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/authServices'

const useLoginUser = () => {
  return useMutation({
    mutationFn: login
  })
}

export default useLoginUser