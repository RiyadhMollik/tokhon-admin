<div className="row">
<div className="col-sm-2"></div>
<div className="col-sm-8">
  <ul className="list-group">
    <li className="list-group-item active" aria-current="true">
      Details {data.name}
    </li>
    <li className="list-group-item bg-white">Email: {data.email}</li>
    <li className="list-group-item bg-white">
      Phone Number: {data.phone_number}
    </li>
    <li className="list-group-item bg-white">Address: {data.address}</li>
    <li className="list-group-item bg-white">
      NID Photo:{' '}
      <img src={data.nid_photo} alt="NID" style={{ maxWidth: '100%' }} />
    </li>
    <li className="list-group-item bg-white">
      Verified Status: {data.is_verified ? 'Verified' : 'Not-Verified'}
    </li>
    <li className="list-group-item bg-white">
      Push Token: {data.push_token}
    </li>
    <li className="list-group-item bg-white">
      Referral Code: {data.referral_code}
    </li>
    <li className="list-group-item bg-white">
      Wallet Balance: {data.wallet_balance}
    </li>
    <li className="list-group-item bg-white">Gender: {data.gender}</li>
  </ul>
</div>
<div className="col-sm-2"></div>

<div className="row">
  <div className="col-sm-12 text-center mt-2">
    <button
      className="btn btn-primary fw-medium text-white py-2 px-4"
      onClick={() => navigate(`/user-edit/${data.user_id}`)}
    >
      EDIT
    </button>
  </div>
</div>
</div>