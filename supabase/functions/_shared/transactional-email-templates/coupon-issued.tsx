/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { firstName?: string; code?: string; amount?: number; minOrderTotal?: number; expiresAt?: string }

const CouponIssuedEmail = ({ firstName, code = 'XXXX', amount = 10, minOrderTotal = 150, expiresAt }: Props) => (
  <Html lang="es">
    <Head />
    <Preview>Tu código de {amount}€ de descuento en Corvera Ibéricos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{firstName ? `¡Gracias, ${firstName}!` : '¡Gracias por tu compra!'}</Heading>
        <Text style={text}>
          Como agradecimiento por elegir nuestro Jamón Cebo 50% Ibérico La Joya, te regalamos
          un código de <strong>{amount}€ de descuento</strong> para tu próxima compra superior a {minOrderTotal}€.
        </Text>
        <Section style={codeBox}>
          <Text style={codeText}>{code}</Text>
        </Section>
        <Text style={text}>
          Aplícalo en el carrito al finalizar tu próximo pedido. Es de un solo uso{expiresAt ? ` y caduca el ${new Date(expiresAt).toLocaleDateString('es-ES')}` : ''}.
        </Text>
        <Text style={footer}>Corvera Ibéricos</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CouponIssuedEmail,
  subject: '🎁 Tu código de 10€ de descuento - Corvera Ibéricos',
  displayName: 'Cupón 10€ regalo',
  previewData: { firstName: 'Jane', code: 'CORV-ABC123', amount: 10, minOrderTotal: 150 },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Lora, Georgia, serif' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '24px', color: '#8B2020', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#333', lineHeight: '1.6', margin: '0 0 16px' }
const codeBox = { background: '#fdf6f6', border: '2px dashed #8B2020', padding: '16px', textAlign: 'center' as const, margin: '20px 0' }
const codeText = { fontSize: '24px', fontWeight: 'bold', color: '#8B2020', letterSpacing: '2px', margin: 0, fontFamily: 'monospace' }
const footer = { fontSize: '12px', color: '#999', marginTop: '24px' }
