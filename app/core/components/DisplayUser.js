



function DisplayUser({ user }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
      <article>
        <div></div>
        <div>
          <p>
            ID: {user.id} - {user.name} - {user.role} - {user.email}
          </p>
        
        </div>
      </article>
    </>
  )
}

export default DisplayUser
