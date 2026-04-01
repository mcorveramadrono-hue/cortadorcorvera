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
  Section,
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

interface OwnerNewOrderProps {
  orderNumber?: string
  orderStatus?: string
  paymentMethod?: string
  customerFirstName?: string
  customerLastName?: string
  customerEmail?: string
  customerPhone?: string
  customerDni?: string
  address?: string
  postalCode?: string
  city?: string
  province?: string
  items?: OrderItem[]
  subtotal?: number
  shippingCost?: number
  total?: number
  totalWeight?: number
  notes?: string
  confirmPaymentUrl?: string | null
}

const formatEuro = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  card: 'Tarjeta (Stripe)',
  bizum: 'Bizum',
  transfer: 'Transferencia bancaria',
}

const OwnerNewOrderEmail = ({
  orderNumber = 'CRV-XXXXX',
  orderStatus = 'pending',
  paymentMethod = 'transfer',
  customerFirstName = 'Cliente',
  customerLastName = '',
  customerEmail = '',
  customerPhone = '',
  customerDni = '',
  address = '',
  postalCode = '',
  city = '',
  province = '',
  items = [],
  subtotal = 0,
  shippingCost = 0,
  total = 0,
  totalWeight = 0,
  notes = '',
  confirmPaymentUrl = null,
}: OwnerNewOrderProps) => {
  const fullName = `${customerFirstName} ${customerLastName}`.trim()
  const methodLabel = PAYMENT_METHOD_LABELS[paymentMethod] || paymentMethod

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Nuevo pedido {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={LOGO_URL} alt="Corvera Ibéricos" width="60" height="60" style={logoStyle} />
          <Heading style={h1}>Nuevo pedido recibido: {orderNumber}</Heading>

          <Text style={text}>
            <strong>Estado:</strong> {orderStatus}
          </Text>
          <Text style={text}>
            <strong>Método de pago:</strong> {methodLabel}
          </Text>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>Datos del cliente</Heading>
          <Text style={text}><strong>Nombre:</strong> {fullName}</Text>
          <Text style={text}><strong>Email:</strong> {customerEmail}</Text>
          <Text style={text}><strong>Teléfono:</strong> {customerPhone}</Text>
          <Text style={text}><strong>DNI:</strong> {customerDni}</Text>

          <Heading as="h3" style={h3}>Dirección de envío</Heading>
          <Text style={text}>{address}</Text>
          <Text style={text}>{postalCode} {city}, {province}</Text>

          <Hr style={hr} />

          <Heading as="h3" style={h3}>Productos</Heading>
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
          <Text style={text}><strong>Peso total:</strong> {totalWeight.toFixed(1)} kg</Text>

          {!!notes && (
            <>
              <Hr style={hr} />
              <Heading as="h3" style={h3}>Notas</Heading>
              <Text style={text}>{notes}</Text>
            </>
          )}

          {!!confirmPaymentUrl && (
            <>
              <Hr style={hr} />
              <Section style={ctaWrapper}>
                <Text style={ctaText}>Cuando recibas el pago, confirma desde este botón:</Text>
                <Button href={confirmPaymentUrl} style={button}>
                  ✅ Confirmar pago recibido
                </Button>
              </Section>
            </>
          )}

          <Text style={footer}>Notificación automática de {SITE_NAME}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OwnerNewOrderEmail,
  subject: (data: Record<string, any>) =>
    `Nuevo pedido ${data.orderNumber || ''} - ${data.customerFirstName || ''} ${data.customerLastName || ''}`.trim(),
  displayName: 'Aviso interno: nuevo pedido',
  previewData: {
    orderNumber: 'CRV-01050',
    orderStatus: 'pending',
    paymentMethod: 'bizum',
    customerFirstName: 'María',
    customerLastName: 'García',
    customerEmail: 'cliente@example.com',
    customerPhone: '+34 600 000 000',
    customerDni: '12345678A',
    address: 'Calle Mayor 1',
    postalCode: '28001',
    city: 'Madrid',
    province: 'Madrid',
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
    totalWeight: 5.2,
    notes: 'Llamar antes de entregar',
    confirmPaymentUrl: 'https://example.com/confirm-payment',
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
const itemLine = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '8px' }
const totalLine = { fontSize: '16px', color: '#1f1f1f', lineHeight: '1.6', margin: '4px 0 0', fontWeight: 'bold' as const }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const logoStyle = { margin: '0 0 20px' }
const ctaWrapper = { marginTop: '8px', marginBottom: '8px' }
const ctaText = { fontSize: '14px', color: '#333333', margin: '0 0 12px' }
const button = {
  backgroundColor: '#8B2020',
  color: '#ffffff',
  padding: '12px 18px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold' as const,
}
const footer = { fontSize: '12px', color: '#888888', margin: '24px 0 0', lineHeight: '1.5' }
