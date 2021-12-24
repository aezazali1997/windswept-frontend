import React from 'react'
import styles from '../../styles/Spinner.module.css'
export const Spinner = ()=> {
  return (
    <div className={styles.spinner}>
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-20 w-20 "></div>
    </div>
  )
}
