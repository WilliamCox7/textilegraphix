import { React } from '../../../packages';
import { radioFilled, radioEmpty } from '../../../assets';

export function template(ShopNav) {
  return (
    <div className="ShopNav">
      <div onClick={() => {ShopNav.setStatus('tshirts', 'selected'); ShopNav.setFilter('t-shirts');}}
        onMouseEnter={() => ShopNav.setStatus('tshirts', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('tshirts', '')}>
        <h1>T-Shirts</h1>
        <img src={ShopNav.state.tshirts === 'selected' ? (radioFilled)
          : (ShopNav.state.tshirts === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.tshirts ? {display: 'none'} : null} />
      </div>
      <div onClick={() => {ShopNav.setStatus('longsleeveshirt', 'selected'); ShopNav.setFilter('long sleeve shirt');}}
        onMouseEnter={() => ShopNav.setStatus('longsleeveshirt', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('longsleeveshirt', '')}>
        <h1>Long Sleeve Shirt</h1>
        <img src={ShopNav.state.longsleeveshirt === 'selected' ? (radioFilled)
          : (ShopNav.state.longsleeveshirt === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.longsleeveshirt ? {display: 'none'} : null}  />
      </div>
      <div onClick={() => {ShopNav.setStatus('collaredshirt', 'selected'); ShopNav.setFilter('collared shirt');}}
        onMouseEnter={() => ShopNav.setStatus('collaredshirt', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('collaredshirt', '')}>
        <h1>Collared Shirt</h1>
        <img src={ShopNav.state.collaredshirt === 'selected' ? (radioFilled)
          : (ShopNav.state.collaredshirt === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.collaredshirt ? {display: 'none'} : null}  />
      </div>
      <div onClick={() => {ShopNav.setStatus('hoodies', 'selected'); ShopNav.setFilter('hoodies');}}
        onMouseEnter={() => ShopNav.setStatus('hoodies', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('hoodies', '')}>
        <h1>Hoodies</h1>
        <img src={ShopNav.state.hoodies === 'selected' ? (radioFilled)
          : (ShopNav.state.hoodies === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.hoodies ? {display: 'none'} : null}  />
      </div>
      <div onClick={() => {ShopNav.setStatus('other', 'selected'); ShopNav.setFilter('other');}}
        onMouseEnter={() => ShopNav.setStatus('other', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('other', '')}>
        <h1>Other</h1>
        <img src={ShopNav.state.other === 'selected' ? (radioFilled)
          : (ShopNav.state.other === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.other ? {display: 'none'} : null}  />
      </div>
      <div onClick={() => {ShopNav.setStatus('originals', 'selected'); ShopNav.setFilter('originals');}}
        onMouseEnter={() => ShopNav.setStatus('originals', 'hovering')}
        onMouseLeave={() => ShopNav.setStatus('originals', '')}>
        <h1>Originals</h1>
        <img src={ShopNav.state.originals === 'selected' ? (radioFilled)
          : (ShopNav.state.originals === 'hovering' ? (radioEmpty) : '//:0')}
          style={!ShopNav.state.originals ? {display: 'none'} : null}  />
      </div>
    </div>
  );
}
