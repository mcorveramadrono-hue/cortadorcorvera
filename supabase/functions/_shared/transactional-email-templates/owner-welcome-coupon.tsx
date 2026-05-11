import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Corvera Ibéricos'

interface OwnerWelcomeCouponProps {
  customerEmail?: string
  code?: string
  amount?: number
}

const OwnerWelcomeCouponEmail = ({
  customerEmail = '—',
  code = '—',
  amount = 5,
}: OwnerWelcomeCouponProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nuevo registro en el pop-up: {customerEmail}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuevo email registrado</Heading>
        <Text style={text}>
          Un visitante de {SITE_NAME} ha solicitado el cupón de bienvenida.
        </Text>
        <Section style={card}>
          <Text style={label}>Email del cliente</Text>
          <Text style={value}>{customerEmail}</Text>
          <Text style={label}>Cupón generado</Text>
          <Text style={value}>{code}</Text>
          <Text style={label}>Importe</Text>
          <Text style={value}>{amount}€ (sin pedido mínimo)</Text>
        </Section>
        <Text style={footer}>{SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OwnerWelcomeCouponEmail,
  subject: (data: Record<string, any>) =>
    `Nuevo registro pop-up: ${data?.customerEmail ?? 'cliente'}`,
  to: 'corveraibericos@gmail.com',
  displayName: 'Aviso interno: nuevo email registrado en pop-up',
  previewData: {
    customerEmail: 'cliente@example.com',
    code: 'BIEN-A1B2C3D4',
    amount: 5,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#8B2020', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.5', margin: '0 0 20px' }
const card = {
  border: '1px solid #eee',
  borderRadius: '6px',
  padding: '16px 20px',
  backgroundColor: '#fafafa',
}
const label = { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, margin: '8px 0 2px', letterSpacing: '0.5px' }
const value = { fontSize: '15px', color: '#111', margin: '0 0 8px', fontWeight: 600 }
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0' }
