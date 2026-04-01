import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Corvera Ibéricos'
const LOGO_URL =
  'https://gdmzfhwmqguextpwbbmg.supabase.co/storage/v1/object/public/email-assets/logo-mc.png'

interface OrderItem {
  name: string
  weight: number
  quantity: number
  price: number
  withKnife: boolean
  knifePrice: number
}

interface OwnerPaymentConfirmedProps {
  orderNumber?: string
  customerFirstName?: string
  customerLastName?: string
  customerEmail?: string
  paymentMethod?: string
  items?: OrderItem[]
  subtotal?: number
  shippingCost?: number
  total?: number
}

const formatEuro = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  card: 'Tarjeta (Stripe)',
  bizum: 'Bizum',
  transfer: 'Transferencia bancaria',
}

const OwnerPaymentConfirmedEmail = ({
  orderNumber = 'CRV-XXXXX',
  customerFirstName = 'Cliente',
  customerLastName = '',
  customerEmail = '',
  paymentMethod = 'transfer',
  items = [],
  subtotal = 0,
  shippingCost = 0,
  total = 0,
}: OwnerPaymentConfirmedProps) => {
  const fullName = `${customerFirstName} ${customerLastName}`.trim()
  const methodLabel = PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Pago confirmado del pedido {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logoStyle} />
          <Heading style={h1}>Pago confirmado manualmente</Heading>

          <Text style={successBadge}>✅ El pedido {orderNumber} ya está marcado como pagado</Text>

          <Text style={text}><strong>Cliente:</strong> {fullName}</Text>
          <Text style={text}><strong>Email:</strong> {customerEmail}</Text>
          <Text style={text}><strong>Método de pago:</strong> {methodLabel}</Text>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>Resumen</Heading>
          {items.map((item, i) => {
            const lineBase = item.price * item.quantity
            const lineKnife = item.withKnife ? item.knifePrice * item.quantity : 0
            const lineTotal = lineBase + lineKnife
            return (
              <Text key={i} style={itemLine}>
                • {item.name} ({item.weight.toFixed(1)} kg) x{item.quantity}
                {item.withKnife
                  ? ` + corte a cuchillo (${formatEuro(item.knifePrice)} x ${item.quantity})`
                  : ''}
                {' — '}<strong>{formatEuro(lineTotal)}</strong>
              </Text>
            )
          })}

          <Hr style={hr} />

          <Text style={text}><strong>Subtotal:</strong> {formatEuro(subtotal)}</Text>
          <Text style={text}><strong>Envío:</strong> {shippingCost === 0 ? 'Gratis' : formatEuro(shippingCost)}</Text>
          <Text style={totalLine}><strong>Total:</strong> {formatEuro(total)}</Text>

          <Text style={footer}>Notificación automática de {SITE_NAME}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OwnerPaymentConfirmedEmail,
  subject: (data: Record<string, any>) =>
    `Pago recibido: ${data.orderNumber || ''} - ${data.customerFirstName || ''} ${data.customerLastName || ''}`.trim(),
  displayName: 'Aviso interno: pago confirmado',
  previewData: {
    orderNumber: 'CRV-01050',
    customerFirstName: 'María',
    customerLastName: 'García',
    customerEmail: 'cliente@example.com',
    paymentMethod: 'bizum',
    items: [
      {
        name: 'Paleta 100% Ibérica DOP',
        weight: 5.2,
        quantity: 1,
        price: 280,
        withKnife: false,
        knifePrice: 0,
      },
    ],
    subtotal: 280,
    shippingCost: 0,
    total: 280,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '580px', margin: '0 auto' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#1f1f1f',
  margin: '0 0 20px',
  fontFamily: "'Playfair Display', Georgia, serif",
}
const h3 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#8B2020', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const successBadge = {
  fontSize: '16px',
  color: '#166534',
  backgroundColor: '#dcfce7',
  padding: '12px 16px',
  borderRadius: '6px',
  margin: '0 0 16px',
  textAlign: 'center' as const,
}
const itemLine = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '8px' }
const totalLine = { fontSize: '16px', color: '#1f1f1f', lineHeight: '1.6', margin: '4px 0 0', fontWeight: 'bold' as const }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const logoStyle = { margin: '0 0 20px' }
const footer = { fontSize: '12px', color: '#888888', margin: '24px 0 0', lineHeight: '1.5' }
