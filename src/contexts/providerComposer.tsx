import { cloneElement } from "react";

// providers
import { UserContextProvider } from "./userContext";
import { SidebarContextProvider } from "./sidebarContext";

const ProviderComposer: React.FC<{
  contexts: any[];
  children: React.ReactNode;
}> = ({ contexts, children }) => {
  return contexts.reduce(
    (acc: any, cur: any) => cloneElement(cur, { children: acc }),
    children,
  );
};

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProviderComposer
      // add providers to array of contexts
      contexts={[
        <UserContextProvider key="user-context" />,
        <SidebarContextProvider key="sidebar-context" />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
