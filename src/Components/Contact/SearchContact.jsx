import { useContext } from 'react';
import { GREENBLUE } from '../../helpers/Color';
import { ContactContext } from '../../context/contactContext';

const SearchContact = () => {
    const { contactSearch } = useContext(ContactContext)
    return (
        <div className="input-group w-100 m-1" dir="ltr">
            <span className="input-group-text" style={{ backgroundColor: GREENBLUE, borderColor: GREENBLUE }} id="searchIcon">
                <i className="fa fa-search"></i>
            </span>
            <input className=" form-control"
                type="text"
                // value={query}            میشه اینو حذف کرد
                onChange={contactSearch}
                name="" aria-label="search" aria-describedby="searchIcon"
                placeholder="جستجو مخاطب" dir="rtl" />
        </div>
    )
}
export default SearchContact