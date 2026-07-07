import { ReservationExperience } from '@/components/booking/ReservationExperience/ReservationExperience'
import { isSmoobuConfigured, resolveApartmentId } from '@/lib/booking/smoobuUnits'
import { VILLA_UNIT } from '@/lib/booking/bookingGateway'

interface BookingWidgetProps {
  prefillMessage?: string
}

// Сървърна граница: чете тайните SMOOBU_*, за да реши дали има жив календар за вилата.
// После клиентският ReservationExperience поема избора на дати и формата.
export function BookingWidget({ prefillMessage }: BookingWidgetProps) {
  const hasCalendar = isSmoobuConfigured() && resolveApartmentId(VILLA_UNIT) !== undefined

  return <ReservationExperience hasCalendar={hasCalendar} defaultMessage={prefillMessage} />
}
