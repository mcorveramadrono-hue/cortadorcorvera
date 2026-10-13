/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { confirmUrl?: string; amount?: number }

const WelcomeCouponConfirmEmail = ({ confirmUrl = '#', amount = 5 }: Props) => (
  <Html lang="es">
    <Head />
    <Preview>Confirma tu correo para recibir tu cupón de {amount}€</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirma tu correo</Heading>
        <Text style={text}>
          Pulsa el botón para confirmar tu correo y recibir tu cupón de <strong>{amount}€</strong> para tu primera compra en Corvera Ibéricos.
        </Text>
        <Button href={confirmUrl} style={button}>Confirmar y recibir mi cupón</Button>
        <Text style={footer}>Si no has pedido este cupón, ignora este correo.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeCouponConfirmEmail,
  subject: 'Confirma tu correo para recibir tu cupón - Corvera Ibéricos',
  displayName: 'Confirmación cupón bienvenida',
  previewData: { confirmUrl: 'https://www.corveraibericos.com', amount: 5 },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Lora, Georgia, serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', color: '#8B2020', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 16px' }
const button = { backgroundColor: '#8B2020', color: '#ffffff', padding: '12px 20px', textDecoration: 'none', fontSize: '15px' }
const footer = { fontSize: '12px', color: '#999', marginTop: '24px' }
