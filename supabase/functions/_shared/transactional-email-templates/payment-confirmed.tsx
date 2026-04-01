import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Img, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Corvera Ibéricos"
const LOGO_URL = 'https://gdmzfhwmqguextpwbbmg.supabase.co/storage/v1/object/public/email-assets/logo-mc.png'

interface OrderItem {
  name: string
  weight: number
  quantity: number
  price: number
  withKnife: boolean
  knifePrice: number
}

interface PaymentConfirmedProps {
  firstName?: string
  orderNumber?: string
  items?: OrderItem[]
  subtotal?: number
  shippingCost?: number
  total?: number
}

const formatEuro = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

const PaymentConfirmedEmail = ({
  firstName = 'Cliente',
  orderNumber = 'CRV-XXXXX',
  items = [],
  subtotal = 0,
  shippingCost = 0,
  total = 0,
}: PaymentConfirmedProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Pago confirmado - Pedido {orderNumber}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logoStyle} />
        <Heading style={h1}>
          ¡Pago confirmado, {firstName}!
        </Heading>

        <Text style={successBadge}>
          ✅ Hemos recibido tu pago correctamente
        </Text>

        <Text style={text}>
          Tu pedido <strong>{orderNumber}</strong> está siendo preparado. Te avisaremos cuando sea enviado.
        </Text>

        <Heading as="h3" style={h3}>Resumen del pedido</Heading>

        {items.map((item, i) => {
          const lineBase = item.price * item.quantity
          const lineKnife = item.withKnife ? item.knifePrice * item.quantity : 0
          const lineTotal = lineBase + lineKnife
          return (
            <Text key={i} style={itemLine}>
              • {item.name} ({item.weight.toFixed(1)} kg) x{item.quantity}
              {item.withKnife ? ` + corte a cuchillo (${formatEuro(item.knifePrice)} x ${item.quantity})` : ''}
              {' — '}<strong>{formatEuro(lineTotal)}</strong>
            </Text>
          )
        })}

        <Hr style={hr} />

        <Text style={text}>
          <strong>Subtotal:</strong> {formatEuro(subtotal)}
        </Text>
        <Text style={text}>
          <strong>Envío:</strong> {shippingCost === 0 ? 'Gratis' : formatEuro(shippingCost)}
        </Text>
        <Text style={totalLine}>
          <strong>Total:</strong> {formatEuro(total)}
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Gracias por tu compra. Prepararemos tu pedido con el mayor cuidado.<br />
          — El equipo de {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PaymentConfirmedEmail,
  subject: (data: Record<string, any>) => `Pago confirmado - Pedido ${data.orderNumber || ''}`,
  displayName: 'Pago confirmado',
  previewData: {
    firstName: 'María',
    orderNumber: 'CRV-01042',
    items: [
      { name: 'Jamón 100% Ibérico DOP', weight: 8.5, quantity: 1, price: 425, withKnife: true, knifePrice: 50 },
    ],
    subtotal: 475,
    shippingCost: 0,
    total: 475,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1f1f1f', margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }
const h3 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#8B2020', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const successBadge = { fontSize: '16px', color: '#166534', backgroundColor: '#dcfce7', padding: '12px 16px', borderRadius: '6px', margin: '0 0 16px', textAlign: 'center' as const }
const itemLine = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '8px' }
const totalLine = { fontSize: '16px', color: '#1f1f1f', lineHeight: '1.6', margin: '4px 0 0', fontWeight: 'bold' as const }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const footer = { fontSize: '12px', color: '#888888', margin: '20px 0 0', lineHeight: '1.5' }
