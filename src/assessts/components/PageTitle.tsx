'use-client'
export default function PageTitle(pageTitle: {
  title: string
}){
  return(<>
    {pageTitle.title}
  </>)
}