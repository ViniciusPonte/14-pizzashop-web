import { api } from '@/lib/axios'

interface UpdateProfileResponse {
  description: string | null
  name: string
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileResponse) {
  await api.put('/profile', { name, description })
}
