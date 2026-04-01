/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

const LOGO_URL = 'https://gdmzfhwmqguextpwbbmg.supabase.co/storage/v1/object/public/email-assets/logo-mc.png'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Restablecer contraseña en {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logo} />
        <Heading style={h1}>Restablecer contraseña</Heading>
        <Text style={text}>
          Hemos recibido una solicitud para restablecer tu contraseña en {siteName}. Haz clic en el botón para elegir una nueva.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Restablecer Contraseña
        </Button>
        <Text style={footer}>
          Si no solicitaste este cambio, ignora este email. Tu contraseña no será modificada.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#1f1f1f',
  margin: '0 0 20px',
  fontFamily: "'Playfair Display', Georgia, serif",
}
const text = {
  fontSize: '14px',
  color: '#555555',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const button = {
  backgroundColor: '#8B2020',
  color: '#ffffff',
  fontSize: '14px',
  borderRadius: '4px',
  padding: '12px 20px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
