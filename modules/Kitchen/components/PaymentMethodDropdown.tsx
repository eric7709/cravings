'use client';

import { useClickOutside } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import { useOrderDataStore } from '@/modules/Orders/store/useOrderDataStore';
import { TiArrowSortedDown } from 'react-icons/ti';
import { PaymentMethod } from '@/modules/Orders/types/orders';

type Props = {
  zIndex?: string;
};

export default function PaymentMethodDropdown({ zIndex }: Props) {
  const { setPaymentMethod } = useOrderDataStore();
  const [opened, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const paymentMethods: { label: string; value: string; color: string }[] = [
    { label: 'All', value: 'all', color: 'bg-gray-500' },
    { label: 'Transfer', value: 'transfer', color: 'bg-green-500' },
    { label: 'Card', value: 'card', color: 'bg-blue-500' },
    { label: 'Cash', value: 'cash', color: 'bg-yellow-500' },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className={`relative ${zIndex} w-full`}>
      <TiArrowSortedDown
        className={`absolute right-2 top-1/2 -translate-y-1/2 duration-300 ${opened && 'rotate-180'}`}
      />
      <div
        onClick={() => setOpen(true)}
        className="flex select-none h-10 px-2 border-gray-200 border rounded-md relative text-sm items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 ${paymentMethods[active].color} border border-gray-700 rounded-full`}
          ></div>
          <p className="capitalize text-xs font-medium">{paymentMethods[active].label}</p>
        </div>
      </div>
      <div
        ref={ref as any}
        className={`text-xs absolute bg-white top-[110%] w-full border-gray-200 border rounded-md left-0 ${
          opened ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <p className="text-[13px] p-2 font-normal border-gray-200 border-b">
          Filter by Payment Method
        </p>
        <div className="space-y-1">
          {paymentMethods.map(({ label, value, color }, key) => (
            <div
              onClick={(e) => {
                setActive(key);
                setPaymentMethod(value as PaymentMethod);
                setOpen(false);
                e.stopPropagation();
              }}
              className={`flex p-2 hover:bg-blue-800 hover:text-white active:scale-[.98] duration-300 items-center cursor-pointer justify-between ${
                active === key && `${color} text-white`
              }`}
              key={label}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 ${color} ${
                    active === key ? 'border-white' : 'border-gray-700'
                  } border-2 rounded-full`}
                ></div>
                <p className="capitalize font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}