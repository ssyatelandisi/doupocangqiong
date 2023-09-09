import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PageContent from './page-content';
export default class RouterModule extends React.Component {
    render(): React.ReactNode {
        return (
            <Router>
                <Routes>
                    <Route path='/' element={<App />}></Route>
                    <Route path='/:index' element={<App />}></Route>
                    <Route path='/content/:index' element={<PageContent />}></Route>
                </Routes>
            </Router>
        )
    }
}