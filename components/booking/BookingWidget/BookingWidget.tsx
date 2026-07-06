import { ReservationExperience } from '@/components/booking/ReservationExperience/ReservationExperience'
import { isSmoobuConfigured, resolveApartmentId } from '@/lib/booking/smoobuUnits'
import { VILLA_UNIT } from '@/lib/booking/bookingGateway'
import type { BookingMode } from '@/lib/booking/modes'

interface BookingWidgetProps {
  initialMode: BookingMode
  initialRoom?: string
  prefillMessage?: string
}

// Сървърна граница: чете тайните SMOOBU_*, за да реши дали има жив календар.
// После клиентският ReservationExperience поема избора и формата.
export function BookingWidget({ initialMode, initialRoom, prefillMessage }: BookingWidgetProps) {
  const hasCalendar = isSmoobuConfigured() && resolveApartmentId(VILLA_UNIT) !== undefined

  return (
    <ReservationExperience
      initialMode={initialMode}
      initialRoom={initialRoom}
      hasCalendar={hasCalendar}
      defaultMessage={prefillMessage}
    />
  )
}
