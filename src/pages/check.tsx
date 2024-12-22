<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
  Top Channels
</h4>

<div className="flex flex-col">
  {/* Header Row */}
  <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
    <div className="p-2.5 xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        Source
      </h5>
    </div>
    <div className="p-2.5 text-center xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        Visitors
      </h5>
    </div>
    <div className="p-2.5 text-center xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        Revenues
      </h5>
    </div>
    <div className="hidden p-2.5 text-center sm:block xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        Sales
      </h5>
    </div>
    <div className="hidden p-2.5 text-center sm:block xl:p-5">
      <h5 className="text-sm font-medium uppercase xsm:text-base">
        Conversion
      </h5>
    </div>
  </div>

  {/* Data Rows */}
  {data.map((item, index) => (
    <div
      key={index}
      className={`grid grid-cols-3 sm:grid-cols-5 ${
        index === data.length - 1
          ? ''
          : 'border-b border-stroke dark:border-strokedark'
      }`}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="flex-shrink-0">
          <img src={item.logo} alt={`${item.name} logo`} className="h-8 w-8" />
        </div>
        <p className="hidden text-black dark:text-white sm:block">
          {item.name}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{item.visitors}K</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">${item.revenues}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{item.sales}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{item.conversion}%</p>
      </div>
    </div>
  ))}
</div>
</div>