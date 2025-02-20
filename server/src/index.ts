import express from 'express'
import { AppDataSource } from './DataSource'
import { userController } from './modules/user/userController'
import { authController } from './modules/auth/authController'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Plop!')
})
app.use('/users', userController)
app.use('/auth', authController)

const port = process.env.PORT
  ? Number(process.env.PORT)
  : 3000
AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port}`,
    )
  })
})
