function Icon({ children, className = "size-5", strokeWidth = 1.8 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  );
}

export function PlusIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" d="M12 5v14M5 12h14" /></Icon>;
}

export function UsersIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16 19.5v-1.125A3.375 3.375 0 0 0 12.625 15h-5.25A3.375 3.375 0 0 0 4 18.375V19.5m15.75 0v-.75a3 3 0 0 0-2.25-2.904M13 4.9a3.125 3.125 0 1 1-6.25 0 3.125 3.125 0 0 1 6.25 0Zm3.25 1.35a2.625 2.625 0 0 1 0 5.25" /></Icon>;
}

export function TeamIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5v-11L12 4l7.5 4.5v11m-15 0h15m-11-7h7m-7 3h7" /></Icon>;
}

export function LogoutIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 8.25 18 12m0 0-3.75 3.75M18 12H8.25m2.25-6.75H6A2.25 2.25 0 0 0 3.75 7.5v9A2.25 2.25 0 0 0 6 18.75h4.5" /></Icon>;
}

export function EditIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM16.862 4.487 19.5 7.125M18 14.25v4.125A1.125 1.125 0 0 1 16.875 19.5H5.625A1.125 1.125 0 0 1 4.5 18.375V7.125A1.125 1.125 0 0 1 5.625 6H9.75" /></Icon>;
}

export function TrashIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M19.228 5.79 18.16 19.673A2.25 2.25 0 0 1 15.916 21H8.084a2.25 2.25 0 0 1-2.244-2.327L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0V4.477c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></Icon>;
}

export function CloseIcon({ className }) {
  return <Icon className={className}><path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" /></Icon>;
}

export function CheckIcon({ className }) {
  return <Icon className={className} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></Icon>;
}

export function ArrowIcon({ className }) {
  return <Icon className={className} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></Icon>;
}

export function GlobeIcon({ className }) {
  return <Icon className={className}><circle cx="12" cy="12" r="8.25" /><path strokeLinecap="round" d="M3.75 12h16.5M12 3.75c2.1 2.26 3.18 5 3.18 8.25S14.1 18 12 20.25C9.9 18 8.82 15.25 8.82 12S9.9 6 12 3.75Z" /></Icon>;
}
