import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Img, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Corvera Ibéricos'
const LOGO_URL = 'https://gdmzfhwmqguextpwbbmg.supabase.co/storage/v1/object/public/email-assets/logo-mc.png'

interface OwnerShippingLinkProps {
  orderNumber?: string
  customerFirstName?: string
  customerLastName?: string
  customerEmail?: string
  address?: string
  postalCode?: string
  city?: string
  province?: string
  shippingUrl?: string
}

const OwnerShippingLinkEmail = ({
  orderNumber = 'CRV-XXXXX',
  customerFirstName = 'Cliente',
  customerLastName = '',
  customerEmail = '',
  address = '',
  postalCode = '',
  city = '',
  province = '',
  shippingUrl = '#',
}: OwnerShippingLinkProps) => {
  const fullName = `${customerFirstName} ${customerLastName}`.trim()
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Marca como enviado el pedido {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logoStyle} />
          <Heading style={h1}>Listo para enviar</Heading>

          <Text style={text}>
            El pedido <strong>{orderNumber}</strong> de <strong>{fullName}</strong> está pagado y listo para enviar.
          </Text>

          <Text style={text}>
            Cuando lo lleves a la mensajería, pulsa el botón de abajo para introducir la compañía y el código de seguimiento. El cliente recibirá automáticamente un email con el tracking.
          </Text>

          <Button href={shippingUrl} style={button}>
            Marcar como enviado
          </Button>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>Dirección de envío</Heading>
          <Text style={text}>{fullName}</Text>
          <Text style={text}>{address}</Text>
          <Text style={text}>{postalCode} {city} ({province})</Text>
          <Text style={text}><strong>Email cliente:</strong> {customerEmail}</Text>

          <Hr style={hr} />

          <Text style={footer}>Notificación automática de {SITE_NAME}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OwnerShippingLinkEmail,
  subject: (data: Record<string, any>) => `📦 Listo para enviar: ${data.orderNumber || ''}`,
  displayName: 'Aviso interno: marcar como enviado',
  previewData: {
    orderNumber: 'CRV-01050',
    customerFirstName: 'María',
    customerLastName: 'García',
    customerEmail: 'cliente@example.com',
    address: 'Calle Mayor 12, 2º B',
    postalCode: '28013',
    city: 'Madrid',
    province: 'Madrid',
    shippingUrl: 'https://cortadorcorvera.lovable.app/marcar-envio/abc?token=xxx',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1f1f1f', margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }
const h3 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#8B2020', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const button = { backgroundColor: '#8B2020', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block', margin: '20px 0' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const logoStyle = { margin: '0 0 20px' }
const footer = { fontSize: '12px', color: '#888888', margin: '20px 0 0', lineHeight: '1.5' }
