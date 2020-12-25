import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import dbConnect from '../utils/dbConnect'
import Pet from '../models/Pet'

const Index = ({ pets }) => (
  <>
    {/* Create a card for each pet */}
    <Container>
      <Typography variant="h1" align="center">BBQ Log</Typography>
    </Container>
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Pet.find({})
  const pets = result.map((doc) => {
    const pet = doc.toObject()
    pet._id = pet._id.toString()
    return pet
  })

  return { props: { pets: pets } }
}

export default Index
