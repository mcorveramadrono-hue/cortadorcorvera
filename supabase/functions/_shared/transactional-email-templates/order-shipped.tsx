import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Img, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Corvera Ibéricos'
const LOGO_URL = 'https://gdmzfhwmqguextpwbbmg.supabase.co/storage/v1/object/public/email-assets/logo-mc.png'

interface OrderShippedProps {
  firstName?: string
  orderNumber?: string
  shippingCarrier?: string
  trackingNumber?: string
  trackingUrl?: string
}

const OrderShippedEmail = ({
  firstName = 'Cliente',
  orderNumber = 'CRV-XXXXX',
  shippingCarrier = '',
  trackingNumber = '',
  trackingUrl = '',
}: OrderShippedProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu pedido {orderNumber} ya está en camino</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logoStyle} />
        <Heading style={h1}>¡Tu pedido está en camino, {firstName}!</Heading>

        <Text style={badge}>📦 Pedido enviado</Text>

        <Text style={text}>
          Tu pedido <strong>{orderNumber}</strong> ya ha salido de nuestras instalaciones y está en camino.
        </Text>

        <Hr style={hr} />

        <Heading as="h3" style={h3}>Datos del envío</Heading>
        <Text style={text}><strong>Compañía:</strong> {shippingCarrier}</Text>
        <Text style={text}><strong>Código de seguimiento:</strong> {trackingNumber}</Text>

        {trackingUrl ? (
          <>
            <Button href={trackingUrl} style={button}>
              Seguir mi pedido
            </Button>
            <Text style={smallText}>
              O copia este enlace: <br />
              <a href={trackingUrl} style={linkStyle}>{trackingUrl}</a>
            </Text>
          </>
        ) : (
          <Text style={smallText}>
            Puedes consultar el estado del envío en la web de {shippingCarrier} con el código de seguimiento.
          </Text>
        )}

        <Hr style={hr} />

        <Text style={text}>
          Si tienes cualquier duda con el envío, responde a este email y te ayudamos.
        </Text>

        <Text style={footer}>
          Gracias por confiar en nosotros.<br />
          — El equipo de {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderShippedEmail,
  subject: (data: Record<string, any>) => `📦 Tu pedido ${data.orderNumber || ''} está en camino`,
  displayName: 'Pedido enviado',
  previewData: {
    firstName: 'María',
    orderNumber: 'CRV-01042',
    shippingCarrier: 'GLS',
    trackingNumber: '1234567890ABC',
    trackingUrl: 'https://www.gls-spain.es/seguimiento?codigo=1234567890ABC',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1f1f1f', margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }
const h3 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#8B2020', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const smallText = { fontSize: '13px', color: '#666666', lineHeight: '1.6', margin: '8px 0 0' }
const badge = { fontSize: '16px', color: '#1e40af', backgroundColor: '#dbeafe', padding: '12px 16px', borderRadius: '6px', margin: '0 0 16px', textAlign: 'center' as const }
const button = { backgroundColor: '#8B2020', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block', margin: '16px 0' }
const linkStyle = { color: '#8B2020', wordBreak: 'break-all' as const }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const logoStyle = { margin: '0 0 20px' }
const footer = { fontSize: '12px', color: '#888888', margin: '20px 0 0', lineHeight: '1.5' }
