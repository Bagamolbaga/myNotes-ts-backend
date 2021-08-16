declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production'
        PORT?: string
        DATABASE_URL?: string
        JWT_HASH: string
      }
    }
  }

  export {}