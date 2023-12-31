"use client"
import React from 'react'
import Register from '@/components/Register'
import Head from 'next/head'
const register = () => {
  return (
    <>
       <Head>
        <title>DevLink</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/images/logo-devlinks-small.svg" />
      </Head>
      <Register />
    </>
  )
}

export default register