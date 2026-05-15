import React, { useEffect, useState } from 'react'
import { Avatar, Container, Text, Stack } from '@mantine/core'
import Service from '../../utils/http'

export default function Profile() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const service = new Service()

    const getProfile = async () => {
      try {
        const response = await service.get('user/me')
        setData(response)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    getProfile()
  }, [])

  if (!data) {
    return (
      <Container size="md">
        <Stack h={300} bg="var(--mantine-color-body)" align="center" justify="center" gap="md">
          <Text>Loading profile...</Text>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="md">
      <Stack h={300} bg="var(--mantine-color-body)" align="center" justify="center" gap="md">
        <Avatar src={data.avatar} size="xl" alt="Profile avatar" />
        <Text c="red" fw={700}>{data.name}</Text>
        <Text>{data._id}</Text>
        <Text>{data.email}</Text>
      </Stack>
    </Container>
  )
}
