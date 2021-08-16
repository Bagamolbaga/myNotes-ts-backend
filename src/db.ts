import { Sequelize } from 'sequelize'

const env: string = process.env.NODE_ENV || 'development'

const devUrl: string = `postgres://postgres:lehabaga@localhost:5432/my_notes`

const prodUrl: string = process.env.DATABASE_URL || ''

export default new Sequelize(env !== 'development' ? prodUrl : devUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: env === 'production' ? 
        {
            ssl: { rejectUnauthorized: false },
            native:true
        } 
            :
        {}
})