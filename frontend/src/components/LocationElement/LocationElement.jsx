import './LocationElement.css'
import icon from '../../img/logo_loc.svg'
export default function LocationElement({name,address}){
	return (
		<div className="house_location_block">
					<div className="location_logo">
						<img src={icon} alt=""/>
					</div>
					<div className="location_information">
						<h4 className="location_info_header">{name}</h4>
						<h5 className="location_info_address">{address}</h5>
					</div>
				</div>
	)
}