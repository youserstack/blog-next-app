export default function combineProviders(providers: any[]) {
  return providers.reduce(
    // (previousValue, currentValue) => any
    (Combined, Provider) =>
      ({ children }: { children: React.ReactNode }) =>
        (
          <Combined>
            <Provider>{children}</Provider>
          </Combined>
        ),
    // initialValue
    ({ children }: { children: React.ReactNode }) => <>{children}</>
  );
}
