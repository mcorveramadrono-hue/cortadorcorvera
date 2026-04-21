/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as orderConfirmation } from './order-confirmation.tsx'
import { template as ownerNewOrder } from './owner-new-order.tsx'
import { template as ownerPaymentConfirmed } from './owner-payment-confirmed.tsx'
import { template as paymentConfirmed } from './payment-confirmed.tsx'
import { template as ownerShippingLink } from './owner-shipping-link.tsx'
import { template as orderShipped } from './order-shipped.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-confirmation': orderConfirmation,
  'owner-new-order': ownerNewOrder,
  'owner-payment-confirmed': ownerPaymentConfirmed,
  'payment-confirmed': paymentConfirmed,
  'owner-shipping-link': ownerShippingLink,
  'order-shipped': orderShipped,
}
