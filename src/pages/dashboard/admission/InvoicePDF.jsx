
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from "dayjs";
import logo from "../../../assets/images/logo.png";
import defaultAvatar from "../../../assets/images/user.jpg";

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: 'column' 
  },
  spaceBetween: {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    color: "#3E3E3E" 
  },
  alignItemCenter: {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  container: {
    flexDirection: 'row',
    marginTop: 24
  },
  logo: { 
    width: 150
  },
  avatar: { 
    marginTop: 20,
    width: 80,
    borderRadius:"7px"
  },
  invoiceTitle: {
    marginTop : 20,
    fontSize : 14,
    fontStyle: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: '#689f38',
  },
  invoiceDate: {
    width:"100%",
    flexDirection: "row", 
    backgroundColor: "#f5f5f5", 
    borderColor: '#e0e0e0',
    borderBottomWidth:1
  },
  userInfo: {
    width:"100%",
    flexDirection: "row", 
    borderColor: '#e0e0e0',
    borderBottomWidth:1
  },
  userInfoCell: {
    width:'50%', 
    paddingTop:7,
  },
  studentId: {
    fontSize: 18,
    fontStyle: "bold",
    width:'50%', 
    paddingBottom:5
  },
  invoice: {
    width:"100%",
    flexDirection: "row", 
    backgroundColor: "#f5f5f5",
    borderColor: '#e0e0e0',
    borderBottomWidth:1
  },
  invoiceCell: {
    width:'50%', 
    padding:6,
  },
  payment: {
    width:'50%', 
    padding:6,
    backgroundColor: "#e0e0e0",
  },
  paymentCompleted: {
    width:'100%', 
    padding:5,
    textAlign: "center",
    color: "#33691e",
    backgroundColor: '#c5e1a5',
  },
  authorized: {
    width:150,
    marginTop:100,
    marginBottom:80,
    borderColor: '#e0e0e0',
    borderTopWidth:1
  }
});

const InvoicePDF = ({data}) => {

  const avatar = data.student?.avatar ? `${import.meta.env.VITE_API_URL}/upload/${
    data.student?.avatar
  }` : defaultAvatar;

  let courseFee;
    if (data.paymentType === "New") {
      courseFee = (
        <>
          <Text style={styles.invoiceCell}>Course Fee</Text>
          <Text style={styles.invoiceCell}>{data.course.courseFee}</Text>
        </>
      );
    } else {
      courseFee = (
        <>
          <Text style={styles.invoiceCell}>Preveus Due</Text>
          <Text style={styles.invoiceCell}>{data.payableAmount + data.discount}</Text>
        </>
      );
    }

  const Header = () => (
    <View style={styles.container}>
        <View style={styles.spaceBetween}>
            <Image style={styles.logo} src={logo} />
        </View>
        <View>
            <Text>#Fakhre Bangal Road, Kandipara,</Text>
            <Text>Brahmanbaria-3400</Text>
            <Text>Phone : 01736722622</Text>
            <Text>Email : almadinait@gmail.com</Text>
            <Text>Web : www.almadinait.com</Text>
        </View>
    </View>
  )

  const InvoiceTitle = () => (
    <View style={styles.container}>
      <View style={styles.spaceBetween}>
        <View style={{ width:'50%', flexDirection :'column'}}>
          <View style={styles.invoiceTitle}>
              <Text>{data.paymentType}</Text>
          </View>
          <View style={styles.invoiceDate}>
              <Text style={{width:'50%', padding:5}}>Invoice Date</Text>
              <Text style={{width:'50%', padding:5}}>{dayjs(data.admitedAt).format("DD-MM-YYYY")}</Text>
          </View>
          <View style={styles.invoiceDate}>
          {data?.nextPay ? (
            <>
              <Text style={{width:'50%', padding:5}}>Due Date</Text>
              <Text style={{width:'50%', padding:5}}>{dayjs(data.nextPay).format("DD-MM-YYYY")}</Text>
            </>
          ) : (
            <Text style={styles.paymentCompleted}>Payment Completed</Text>
          )}
          </View>
        </View>
        <View style={styles.alignItemCenter}>
            <Image style={styles.avatar} src={avatar} />
        </View>
      </View>
    </View>
  )

  const UserInfo = () => (
    <View style={{ width:'60%', flexDirection :'column'}}>
      <View style={styles.userInfo}>
          <Text style={styles.studentId}>Student ID</Text>
          <Text style={styles.studentId}>{data.student.studentId}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Student Name</Text>
          <Text style={styles.userInfoCell}>{data.student.fullName}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Address</Text>
          <Text style={styles.userInfoCell}>{data.student.address.present}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Mobile</Text>
          <Text style={styles.userInfoCell}>{data.student.phone[0]}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Status</Text>
          <Text style={styles.userInfoCell}>{data.student.status}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Course Name</Text>
          <Text style={styles.userInfoCell}>{data.course.name}</Text>
      </View>
      <View style={styles.userInfo}>
          <Text style={styles.userInfoCell}>Batch No</Text>
          <Text style={styles.userInfoCell}>{data.batchNo}</Text>
      </View>
    </View>
  )

  const Invoice = () => (
    <View style={{ marginTop:30, width:'40%', flexDirection :'column'}}>
      <View style={styles.invoice}>
          {courseFee}
      </View>
      <View style={styles.invoice}>
          <Text style={styles.invoiceCell}>Discount</Text>
          <Text style={styles.invoiceCell}>{data?.discount || 0}</Text>
      </View>
      <View style={styles.invoice}>
          <Text style={styles.invoiceCell}>Total</Text>
          <Text style={styles.invoiceCell}>{data.payableAmount}</Text>
      </View>
      <View style={styles.invoice}>
          <Text style={styles.payment}>Payment</Text>
          <Text style={styles.payment}>{data.payment}</Text>
      </View>
      <View style={styles.invoice}>
          <Text style={styles.invoiceCell}>Due</Text>
          <Text style={styles.invoiceCell}>{data.due}</Text>
      </View>
    </View>
  )

  const Authorized = () => (
    <View style={styles.authorized}>
      <Text style={{padding:20}}>Authorized Signatory</Text>
    </View>
  )

  const Note = () => (
    <View>
      <Text>This invoice must be produced when demanded.</Text>
      <Text>Fees once paid are not refundable.</Text>
      <Text>Subject to terms and conditions printed overleaf the invoice.</Text>
    </View>
  )
  
  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <InvoiceTitle />
        <View style={{marginTop:80, flexDirection: 'row', gap:30 }}>
          <UserInfo />
          <Invoice />
        </View>
        <Authorized />
        <Note />
      </Page>
    </Document>
  );
};

export default InvoicePDF;


