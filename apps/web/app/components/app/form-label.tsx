export default function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col gap-2'>
      {children}
    </label>
  );
}
