export default function combineProviders(providers: any[]) {
  return providers.reduce(
    (Combined, Provider) => {
      const CombinedComponent = ({ children }: { children: React.ReactNode }) => (
        <Combined>
          <Provider>{children}</Provider>
        </Combined>
      );
      CombinedComponent.displayName = `Combined(${Combined.displayName || "Anonymous"}, ${
        Provider.displayName || "Anonymous"
      })`;
      return CombinedComponent;
    },
    ({ children }: { children: React.ReactNode }) => <>{children}</>
  );
}

// export default function combineProviders(providers: any[]) {
//   return providers.reduce(
//     // (previousValue, currentValue) => any
//     (Combined, Provider) =>
//       ({ children }: { children: React.ReactNode }) =>
//         (
//           <Combined>
//             <Provider>{children}</Provider>
//           </Combined>
//         ),
//     // initialValue
//     ({ children }: { children: React.ReactNode }) => <>{children}</>
//   );
// }
