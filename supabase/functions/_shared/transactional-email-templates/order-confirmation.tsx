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

interface OrderConfirmationProps {
  firstName?: string
  orderNumber?: string
  items?: OrderItem[]
  subtotal?: number
  shippingCost?: number
  total?: number
  paymentMethod?: string
}

const formatEuro = (v: number) => `${v.toFixed(2).replace('.', ',')} €`

const BIZUM_PHONE = "+34 676 703 034"
const TRANSFER_IBAN = "ES53 0182 1836 9502 0157 8384"
const TRANSFER_HOLDER = "Marcos Corvera Madroño"

const OrderConfirmationEmail = ({
  firstName = 'Cliente',
  orderNumber = 'CRV-XXXXX',
  items = [],
  subtotal = 0,
  shippingCost = 0,
  total = 0,
  paymentMethod = 'transfer',
}: OrderConfirmationProps) => {
  const isCard = paymentMethod === 'card'

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>
        {isCard
          ? `Pedido confirmado ${orderNumber}`
          : `Confirmación de tu pedido ${orderNumber}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Gracias por tu pedido, {firstName}
          </Heading>

          {isCard ? (
            <Text style={text}>
              Tu pago con tarjeta ha sido <strong>procesado correctamente</strong>. Prepararemos tu pedido en breve.
            </Text>
          ) : (
            <Text style={text}>
              Hemos recibido tu pedido <strong>{orderNumber}</strong> y está <strong>pendiente de pago</strong>.
            </Text>
          )}

          <Heading as="h3" style={h3}>Resumen del pedido ({orderNumber})</Heading>

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

          {!isCard && (
            <>
              <Hr style={hr} />
              <Heading as="h3" style={h3}>Cómo realizar el pago</Heading>

              {paymentMethod === 'bizum' ? (
                <Section>
                  <Text style={text}><strong>Pago por Bizum</strong></Text>
                  <Text style={text}>Teléfono: {BIZUM_PHONE}</Text>
                  <Text style={text}>Concepto: {firstName} - {orderNumber}</Text>
                  <Text style={text}>Importe: {formatEuro(total)}</Text>
                </Section>
              ) : (
                <Section>
                  <Text style={text}><strong>Pago por transferencia bancaria</strong></Text>
                  <Text style={text}>Titular: {TRANSFER_HOLDER}</Text>
                  <Text style={text}>IBAN: {TRANSFER_IBAN}</Text>
                  <Text style={text}>Concepto: {firstName} - {orderNumber}</Text>
                  <Text style={text}>Importe: {formatEuro(total)}</Text>
                </Section>
              )}
            </>
          )}

          <Hr style={hr} />

          {isCard ? (
            <Text style={footer}>
              Gracias por tu compra. Prepararemos tu pedido y te avisaremos cuando sea enviado.
            </Text>
          ) : (
            <Text style={footer}>
              Tu pedido no se preparará hasta confirmar el ingreso.<br />
              Gracias por confiar en nosotros.
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OrderConfirmationEmail,
  subject: (data: Record<string, any>) =>
    data.paymentMethod === 'card'
      ? `Pedido confirmado ${data.orderNumber || ''}`
      : `Confirmación de tu pedido ${data.orderNumber || ''}`,
  displayName: 'Confirmación de pedido',
  previewData: {
    firstName: 'María',
    orderNumber: 'CRV-01042',
    items: [
      { name: 'Jamón 100% Ibérico DOP', weight: 8.5, quantity: 1, price: 425, withKnife: true, knifePrice: 50 },
    ],
    subtotal: 475,
    shippingCost: 0,
    total: 475,
    paymentMethod: 'transfer',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Lato', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1f1f1f', margin: '0 0 20px', fontFamily: "'Playfair Display', Georgia, serif" }
const h3 = { fontSize: '16px', fontWeight: 'bold' as const, color: '#8B2020', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const itemLine = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 6px', paddingLeft: '8px' }
const totalLine = { fontSize: '16px', color: '#1f1f1f', lineHeight: '1.6', margin: '4px 0 0', fontWeight: 'bold' as const }
const hr = { borderColor: '#e5e5e5', margin: '16px 0' }
const footer = { fontSize: '12px', color: '#888888', margin: '20px 0 0', lineHeight: '1.5' }
