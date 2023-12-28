import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectWidgets } from "../../../store/widgetsSlice";

function ScheduleWidget(props) {
  const widgets = useSelector(selectWidgets);
  const { series, ranges } = widgets?.schedule;
  const [tabValue, setTabValue] = useState(0);
  const currentRange = Object.keys(ranges)[tabValue];

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          History of transactions
        </Typography>
        <div className="mt-12 sm:mt-0 sm:ml-8">
          <Tabs
            value={tabValue}
            onChange={(ev, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-16 min-h-40"
            classes={{
              indicator: "flex justify-center bg-transparent w-full h-full",
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            {Object.entries(ranges).map(([key, label]) => (
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                key={key}
                label={label}
              />
            ))}
          </Tabs>
        </div>
      </div>
      <List className="py-0 mt-8 divide-y">
        {series[currentRange].map((item, index) => (
          <ListItem key={index} className="px-0">
            <ListItemText
              classes={{ root: "px-8", primary: "font-medium" }}
              primary={item.title}
              secondary={
                <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
                  {item.time && (
                    <span className="flex items-center">
                      <FuseSvgIcon size={35} color="disabled">
                        heroicons-solid:clock
                      </FuseSvgIcon>
                      <Typography
                        component="span"
                        className="mx-6 text-md"
                        color="text.secondary"
                      >
                        {item.time}
                      </Typography>
                    </span>
                  )}

                  {item.location && (
                    <span className="flex items-center">
                      {/* <FuseSvgIcon size={20} color="disabled">
                        heroicons-solid:ethereum
                      </FuseSvgIcon> */}
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="17.5" cy="17.5" r="17.5" fill="#F0EFED" />
                        <rect
                          x="4.375"
                          y="4.37549"
                          width="26.25"
                          height="26.25"
                          fill="url(#pattern0)"
                        />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlinkHref="#image0_151_1303"
                              transform="translate(-0.194444 -0.194444) scale(0.00694444)"
                            />
                          </pattern>
                          <image
                            id="image0_151_1303"
                            width="200"
                            height="200"
                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAU2klEQVR4nO3dfVBUVQMG8HMRMHZzIWLToPC1pgQ/igksqRC/xcqZxGmaRmimqWQsK9apaQJLp2EBlVg0jZZULAQkBNRqxNQQlPIDRJEBVlECDMXlY9tYVoz2vH8IZcbdz3v3Ltzn91cp3D3FPtz7nHv2XEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA3CilEkqpROhxwD/chR4A/KOpqWnFpUuXJISQZKHHAuBSKKV+arX6+sKFC3uNRmOg0OOBW9yEHgDcUllZqfr999/lWq1WmpmZqRJ6PHALAuICuru7I06dOhUz9O/5+fnRzc3Ni4QcE9yCgLiAsrIytclk+vvfTSYTSU5OVqGwCw8BEdilS5fiL1++HHznn1dVVQUfPHgwXogxwT8QEAFRSv0OHz6cxDDMf/7Ozc2NfPbZZwl6vT5IgKHBIAREQJWVlao//vhDyvb33d3dUrVarXTmmODfEBCBdHd3R5w+fTrG0tcVFBREX7x4EYVdIAiIQH766Sf1X3/9ZfHrKKUkNTUVhV0gCIgAGhsb45ubm/9TzNnU1NQE//DDDwl8jgmGh4A4mdFoDDx69OiwxZwNwzBEpVLFo7A7HwLiZCdPnlT29vayFnM2Op1OmpmZicLuZAiIE3V1dS06c+aMxWLOprCwMFqj0SzlckxgHgLiJJRSSVlZmer2O+Z2HIOkpKSgsDsRAuIkthZzNrW1tRP37duHwu4kCIgTGI3GwLKysgRbijkbhmHIpk2bUNidBAFxgpMnT6r6+vpsLuZs9Hq9dOvWrVgS7wQICM86OjoWVVdXR3N93KKioqj6+noUdp4hIDwaKuaUUj6OjSXxToCA8Ki+vj6+ra3N4WJu5vgTS0pKUNh5hIDwxGg0BpaXl3NSzNkwDEM+//xzFHYeISA84bqYs9Hr9dLNmzejsPMEAeEBX8WcTUlJSVRtbe1yZ72emCAgHKOUSo4cOaLmo5ibgyXx/EBAOFZXVxf/22+/TXT26zY2NsqLiopQ2DmGgHCov78/qKKigtdizmawsCd2dnaisHMIAeHQsWPHVEajkfdizqa3t5ds2bJFLdTrj0YICEc6OjqWnj17Nkrocezfv38WCjt3EBAODBZzl5hqZRgGd9g5hIBwoL6+PkGIYs7mwoUL8j179iQJPY7RAAFxUH9/f9DRo0fjhSjmbBiGIZs3b1agsDsOAXHQ0aNHBS3mbPr6+sjmzZtR2B2EgDigo6Nj6fnz5wUv5my+//77WTU1NSjsDkBA7EQplRw6dMglijkbhmFwh91BCIid6urqEq5eveoyxZzNxYsX5bt373bpILsyBMQO/f39QeXl5S5VzNkwDEO2bt26QqvVhgo9lpEIAbFDRUWF6saNGy5XzNkYjUaSkZGRLvQ4RiIExEYdHR1Lz50757LFnM2BAwdmVVdXrxB6HCMNAmIDSqnkxx9/HJFTpwzDkJSUlCRKqZ/QYxlJEBAbnD17NunatWtyocdhr8uXL8tzcnKwv68NEBAr6fX6oOPHjytGQjFnwzAM+fLLL1HYbYCAWOmXX35R9/f3Cz0Mh/X395P09PQReZkoBATECu3t7cvPnz8/S+hxcKW0tDT01KlTKOxWQEAsGAl3zG3l5uaGwm4lBMSCs2fPJly/fn3EFnM2LS0t8q+//hqF3QIExIzBYj4i7pjbimEYolarUdgtQEDMOH78uLq/v3/E3DG31c2bN8mGDRtQ2M1AQFi0tbUtr6+vHzXFnM3hw4dDT5w4gcLOAgEZhlCfMdfpdOTmzZtOfU03NzeSmpqKws7CXegBuKIzZ84kabVaubO6x7Vr10hjYyO5fv06uXr1KvHy8iLe3t7Ey8vLKa/f2toq37Fjh5IQEueUFxxBRl/7dJBerw/auXNnA5+/yYe2Jf3111+JRqMhf/zxB2EYhlBKSVNT09//7OHhQWQyGbn77rsJ32H19PQkRUVFYf7+/tW8vtAIgzPIHY4dO6bmMxwDAwOkqamJXLhwgfT39xOGYYZ98zMMQwYGBkhXVxfR6XREJpORcePGETc3fq6Kb968SdLS0nIIIVN4eYERCh3kNm1tbcsbGhp4KeZ9fX3k7NmzZP/+/aSuro7cvHnTqrMCwzDEZDIRnU5H2traSHd3NxkYGOBjiKSsrCz4+PHj8bwcfITCJdYgSqnfzp0767u6uji9KdjT00MaGxvJlStXLAbi9kssS18nlUqJt7c38fT05HK4JCAgQLtv374pDMN0cnrgEQqXWIOqqqqUXIWDYRhy9epV0tjYSLRaLetllCPH7+vrIwaDgdx1112cFvorV67It23bhsI+CGcQQojBYAjdtm1b1Z9//mn3MdiKt63HsOYMMtz3eXh4EG9vbyKVSh0Oo4eHBykuLp7l7+9/zKEDjQI4gxBCjhw5ku5IOKwt3nwZKvSdnZ2kp6fH4UL/559/kvXr16sJCjtKeltb23KNRmNXMR8q3vv27bOpePOFy0JfUVERXFFRIfrCLupLLEqpJDs7+9fu7m6buoctxdvG8dh1iWXpmPYW+vvvv9/w3Xff/U/MhV3Ul1inT59W2RKOq1evEo1Gw0vx5osjhb69vV2qVqtVhJBYfkfpulz/J8wTnU4XunPnzipzlyBcFG9b8HEGGe41bLlD7+7uTgoLC2cFBgaKsrCL9gxSUVGhNhcOoYs3X2y9Qz8wMDC0JF6UhV2UJb2lpWWFRqMZ9oNCrla8+WJLoa+srAwuKysTZWEffT95Cyilftu3b6/X6XT/6h46nY40NDRwXrxtHBvvl1iWXp+t0I8fP96we/fu/8lkMlEVdtFdYp08eVJ5eziGlpqPpOLNF3OFvqOjQ5qTkyO6wi6qd4NOpwvNzs6uGhgYcFrxtoXQZ5A73Vno3d3dyZ49e0RV2EV1Bjly5Ii6rq6OXLx4cVQVb74MV+hTU1NFVdhFU9INBkPooUOH/EZz8ebLUKHv6ekhly9flnR3d0cIPSZnEU1ApFJpdWZm5pS1a9cm+vr6GoQez0hCKSV+fn6GrVu3Kg8cODDF19dXNJdYovw1ajQaA9Vqterbb7+NNplMQg/nb67WQQghZMyYMeT1118vfv/99xW+vr6tQo/H2VznJyGA1tbWiLS0NPXJkyeDXeFN6UoBoZSSyMjIBqVSqQgODj4o9HiEIvxPQmCUUklZWVn8pk2bEjo6OgTdJM5VAuLv729ISkpKXrJkSQbDMH2CDkZgogkIpdTP3KpUvV7vl5+fr8rNzY1x9t5UQ4QOiKenJ3nnnXd2vf322wpzNwQt/b8cTURT0gkhEo1Gk862QZpMJuuMi4uL3b1796zIyMiGoYWKYkApJVFRUQ0nTpyY9dFHH8WyhUOv1wcVFBTk3LhxQzTPXRdNQBiGaZXL5SXZ2dm/ajSaBErpsD9kf3//Y+vXr5+yadOmuMDAQO1oDgqllEyaNElbUFAQt2vXrilsNwAppZK9e/cmvfTSS1WPPfbYLi8vL9GUdVHdKPT19T12/vz5jP379ysDAwNjurq6FPfee++wBXTmzJlZlNLiXbt2KXfs2LHCaDQ6e7i8kkgk5IMPPshatWpVornLpdra2uWvvvqqsq6ubqJCocgSW2EXTQe53d69e6uamppCGYYhTzzxROnMmTPjzP1W1Gq1oVu2bEkvLS2dNRo+D7Js2bLqdevWxZnbRbGzszNoy5Yt6u+++24WIYSEhoY2qNXqMLGVdlEGxGg0BmZnZ9f39fVJCSFEIpEYIiIiMqZNm5Zs7g1QU1OzPD09XXXhwgVe9u3lMyCUUjJ16lTt+vXrFeHh4blmvk6Sl5eXlJWVpejt7SWEEDJu3DhDYWFhpFwuF922pKIMCCG3PhNSWFj497MxKKXk/vvvb1mwYIFi/PjxJWzfRymVlJSUJHzxxReJQ28grvAVEJlMRhISElSvv/76GnO/AKqrq1ekpqYmXbp06e9fACaTiWzcuDFx/vz5yZwOaoQQbUAIIeSnn34qOnPmTPSdfz59+vTS2bNnK8aOHdvI9r16vT4oMzNTVVJSEsXVePgISGxsbGliYqLCz8+P9b9Fq9WGpqWlqX/88cfQOz9ZuGTJktJ169Yt5mxAI4yoA0Ip9fvmm2+qtFrtxDv/buzYseTpp59WPfHEE2Z/62o0mqVpaWmq2traiY6+sbkKCKWUzJgxoyU1NVUREhJi7mzot337dtWOHTtihnvEdUBAgLagoCBMTLNWdxJ1QAghpKOjY1FeXl7pX3/99Z+/o5QSuVyunTdvnuLBBx80e91+4MCBhM8//zy+p6fH7rvxXATk3nvvNaxduzbjlVdeMdunKioq4tPS0pKuXLkiZdtd/ptvvomeMmUKa8DEQPQBIYSQmpqa9MOHDyvMvTEnT55cPXfu3DipVMpaVI1GY+BXX32lKigoiB4ucJY4EpAxY8aQN998s3j16tVmFxW2trZGbNiwQV1ZWRnMtlEDpZSsXLly15tvvimqTw8OBwEht84AxcXFFc3NzWaf+Orh4UGeeuqprKeeesrsvYPm5uZFKpVKZesiSHsCYjKZyOzZsy0uKhwKb25ubrSl3RYff/zxlu3bt08R25TucBCQQXq9PignJ6fKaDRavES65557tHPnzk2eNGlShrmvKysri8/IyEiydhGkLQGhlJKAgACLiwoppZJDhw7Fp6enJ2i1WovjkEgkpKCgAE+aGoSA3KapqWnF3r17rXosMqWUPPzwww2zZ8+OM/cBIkqp37Zt21Q5OTkWF0FaGxBPT0/y7rvv7nrrrbfMLiq8ePHiotTUVFVNTY1VZzKTyURSUlISo6KiRDmlOxwE5A6HDh06cO7cOaunbseMGUNmzJix65lnnlGYu+xqb2+PyMjIUJeXl7O+WS0FxGQykcWLFzekpKTEmds4YWgKurCwMMqWtWRRUVHVSqUyzOpvEAEE5A6U0sDs7OwqWze0HjdunCEyMnLN5MmTs8xdu584cWLFZ599ltTa2vqfu/FsARk8W2lTU1PXzJ07N8vM2CUlJSUJW7dujdfpdDbNpk2YMMGwZ8+eKWKe0h0OAjKMjo6Opbm5ucW2fhyXUkoCAwMb5s+fz7oIcvDr/IZbBDlcQGxZVLhhwwZVfX29zctgGIYh27ZtizZ3z0SsEBAWp06dUpeXl6+wZ8rVzc2NhISEFIeHhyusWQR58ODBWYT8OyCDiwor1q1bt9qWRYW2opSS1157rfidd95ZZs/3j3YICAtKqaSwsLCqtbU12N5jWLsIsra2dvnGjRtVGo1G3tTURKZNm2bNokK/vLy8BLVarTAY7N+kZerUqS1ff/01pnRZICBmGAyG0Ozs7PIbN244dHfc39+/Zc6cOQp/f3+ziyCLioqSdDodsbSo8NSpUys2bNiQdPnyZYdWFd91110kPz9fVDsl2goBsUCj0STs379fycUCwunTp1eEh4fHyWQy1oWD5rS3t4eqVCr1kSNHQh0dj8lkImvXrlW++OKLaxw60CiHgFihtLT0QF1dHSerdj09PUlERIQqJCTE7FnidkP3UrKzs4ddVGiPOXPmVKelpWFK1wIExApGozEwNze36s5HJtjL2kWQhNxaVLhx48ak3377bdhFhfaQy+WGvLy8KWLcCM5WCIiV2tvbl+bn5xdzuYkDpZQEBwdXPPvss6t9fHz+NVM1tKjw559/5nxTu8zMzJgnn3zSbDDhFgTEBpWVlTk///xzDNdvWA8PDxIeHp41Y8aMxBs3bkisXVRoK0opiYmJKV69ejWmdK2EgNiAUirJz8+vb29v/88HrLjg7e2tLSwslHR1dfGyw+Ojjz7akpeXFyaWTd+4IJp9sbjAMEzfc889t8zW541bq6enR27Nilt7eHp6kuTk5DiEwzYIiI18fHyq582blziSNpQzmUxEoVAoJ02aJKo9rbiAgNhh6tSpyZMnT64QehzWioiIaHjppZewhN0OCIidFixYECuTyVz+QTz33HOP4ZNPPonGUhL7ICB28vLyal28eHGs0I8qMIdSSj799NPV5rb8AfMQEAc8+OCDJU8++WSx0ONg8/LLL5c+/fTTrJ8fAcsQEAc9++yzcRMmTGgRehx3mjRpknblypWi35XEUQiIgxiG6VyyZEmcu7vrbJTv7u5OUlJSWJ/zAdZDQDjg7e19cN68eUpXmPqllJJVq1ZlPfLII5jS5QACwpFp06YlP/LII4JvlRMWFtYQExOjEHoco4XrXBeMcAzD9BmNxuhr167V9/b2CvIwUJlMZlAqlbGY0uUOziAcGpz6XS3Ea5tMJvLxxx8ni/EZHnxCQDg2ceLErLCwMKdP/UZHR5fOnTsXd8s5hoDwIDIyMk4ul2ud9XoBAQHa999/P85ZrycmCAgPGIbpXLx48bIxY8bw/lpubm4kNTXV7DMWwX4ICE/uu+++Y7Nnz+Z16nfwMQVZYn+GB58QEB6FhIQkP/TQQw08Hr/ltddew5QujxAQHjEM07dgwYJoLy8vzlf9SqVSQ1JS0jJM6fILAeGZTCZrjIqKWsPlpZbJZCJr1qxJxjM8+IeAOMHDDz+cERISUsrV8Z5//vmKhQsXYkrXCRAQJ5k/f36sr6+vw1O/EyZMMCQmJmKVrpMgIE7CMEzn888/H8v24Ewrj0GUSmUspnSdBwFxovHjxx+MiIhQ2dNHKKXkjTfe2IVneDgXAuJkYWFhawIDA22e+p06dWpLXFwc7pY7GQLiZAzD9C1atCh27NixVk/9SiQSglW6wkBABODj41O9cOHCZGsutUwmE/nwww+VeIaHMBAQgUyePDl5+vTpFvfWmj9/fvULL7yAZ3gIBAERUGRkZKyPjw/r1K9cLjd8/PHHMc4cE/wbAiIgLy+v1ueeey6ObW8tpVJp99OogBsIiMD8/f1LwsPDs27vI5RSEhsbWxwaGopneAgMAXEB4eHhioCAgL/31goKCmp57733MKULMESn04VmZGTQmTNn0ubm5kVCjwduwa4mLsLHx6f6/PnziQ888IAEjykAGAalVEIplQg9DgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDY/wElrK+j/vF+pwAAAABJRU5ErkJggg=="
                          />
                        </defs>
                      </svg>
                      <Typography
                        component="span"
                        className="mx-6 text-md"
                        color="text.secondary"
                      >
                        {item.location}
                      </Typography>
                    </span>
                  )}
                </span>
              }
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="more" size="large">
                <FuseSvgIcon>heroicons-solid:chevron-right</FuseSvgIcon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/*
  <div className="flex flex-col mt-2 divide-y">
    <ng-container *ngFor="let scheduleItem of data.schedule[scheduleDaySelector.value]; trackBy: trackByFn">
    <div className="flex flex-row items-center justify-between py-4 px-0.5">
      <div className="flex flex-col">
        <div className="font-medium">{{scheduleItem.title}}</div>
        <div className="flex flex-col sm:flex-row sm:items-center -ml-0.5 mt-2 sm:mt-1 space-y-1 sm:space-y-0 sm:space-x-3">
          <ng-container *ngIf="scheduleItem.time">
          <div className="flex items-center">
            <mat-icon
              className="icon-size-5 text-hint"
            [svgIcon]="'heroicons_solid:clock'"></mat-icon>
          <div className="ml-1.5 text-md text-secondary">{{scheduleItem.time}}</div>
        </div>
      </ng-container>
      <ng-container *ngIf="scheduleItem.location">
      <div className="flex items-center">
        <mat-icon
          className="icon-size-5 text-hint"
        [svgIcon]="'heroicons_solid:location-marker'"></mat-icon>
      <div className="ml-1.5 text-md text-secondary">{{scheduleItem.location}}</div>
    </div>
  </ng-container>
</div>
</div>
  <button mat-icon-button>
    <mat-icon [svgIcon]="'heroicons_solid:chevron-right'"></mat-icon>
</button>
</div>
</ng-container> */}
    </Paper>
  );

  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20 h-64 ">
        <Typography className="text-16 font-medium">
          {props.widget.title}
        </Typography>

        <Select
          value={currentRange}
          onChange={handleChangeRange}
          inputProps={{
            name: "currentRange",
          }}
          classes={{ select: "py-8" }}
          variant="filled"
        >
          {Object.entries(props.widget.ranges).map(([key, n]) => {
            return (
              <MenuItem key={key} value={key}>
                {n}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <List className="py-0">
        {props.widget.schedule[currentRange].map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              classes={{ root: "px-8", primary: "font-medium text-16" }}
              primary={item.title}
              secondary={item.time}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="more" size="large">
                <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default memo(ScheduleWidget);
