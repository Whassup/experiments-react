import { FunctionComponent } from "react";


interface PropertiesPageLayoutProps {
  propertyList: React.ReactNode
}

export const PropertiesPageLayout: FunctionComponent<PropertiesPageLayoutProps> = ({propertyList }) => {
  return <main>
    <h1>Properties Page</h1>
    {propertyList}
  </main>

};
