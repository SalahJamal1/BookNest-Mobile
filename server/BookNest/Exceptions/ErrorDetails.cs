namespace BookNest.Exceptions;

public class ErrorDetails
{
    public string status { get; set; }
    public string message { get; set; }
    public DateTime timeStamp { get; set; } = DateTime.Now;
    public string stack { get; set; }
}